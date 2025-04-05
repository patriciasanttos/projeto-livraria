import React, { useEffect, useState } from 'react';

import { useReportsData } from '../../../hooks/useReportsData';
import ReportsChart from '../../../Components/ReportsChart/ReportsChart';

import './Reports.scss';
import { toast } from 'react-toastify';

function Reports() {
  const { data, isLoading, error, refetch } = useReportsData();

  const [chartType, setChartType] = useState('search_reports');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!data)
      return;

    refetch();

    if (chartType === 'search_reports' && data.searchReports?.length) {
      const labels = data.searchReports.map((item) => item.item.name);
      const counts = data.searchReports.map((item) => item.count);

      const datasets = [
        {
          label: 'Relatório de buscas por itens',
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];

      setChartData({ labels, datasets });
    }

    if (chartType === 'sale_reports' && data.salesReports?.length) {
      const labels = data.salesReports.map((item) => item.item.name);
      const counts = data.salesReports.map((item) => item.count);

      const datasets = [
        {
          label: 'Relatório de vendas de itens',
          data: counts,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ];

      setChartData({ labels, datasets });
    }
  }, [data, chartType]);

  const handleReload = async () => {
    const realoadingDataToast = toast.warning('Recarregando dados...', {
      autoClose: false
    })

    try {
      await refetch();
      toast.dismiss(realoadingDataToast);
      toast.success('Dados recarregados!');
    } catch (err) {
      toast.dismiss(realoadingDataToast);
      toast.error('Erro ao recarregar dados.');
    }
  }

  if (isLoading)
    return <p className='no-items-warn'>Buscando dados...</p>

  if ((data?.searchReports?.length === 0 && data?.salesReports?.length === 0) || error)
    return <p className='no-items-warn'>Desculpe, parece que nenhum relatório foi encontrado.</p>

  return (
    <div className='reports-page'>
      <div className="chart-container">
        <div>
          <select defaultValue='search_reports' onChange={e => setChartType(e.target.value)}>
            <option value="search_reports">Relatório de buscas</option>
            <option value="sale_reports">Relatório de vendas</option>
          </select>

          <button className='reload-button' onClick={handleReload}>Recarregar</button>
        </div>

        {chartData && chartData.labels && chartData.datasets && (
          <ReportsChart
            type={chartType}
            data={chartData}
          />
        )}
      </div>
    </div>
  );
}

export default Reports;