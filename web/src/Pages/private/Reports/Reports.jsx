import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useReportsData } from '../../../hooks/useReports';

//-----Icons
import reloadIcon from '../../../assets/icons/reload.svg';

//-----Components
import ReportsChart from '../../../Components/ReportsChart/ReportsChart';
import Loading from '../../../Components/PageProcessing/Loading/Loading';

import './Reports.scss';
import ErrorFinding from '../../../Components/PageProcessing/ErrorFinding/ErrorFinding';

function Reports() {
  const { data, isLoading, error, refetch } = useReportsData();

  const [chartConfig, setChartConfig] = useState({
    type: 'search',
    entityType: 'items'
  });
  const [chartData, setChartData] = useState([]);

  const [query, setQuery] = useState('');

  useEffect(() => {
    refetch();
    if (!data)
      return;

    if (chartConfig.type === 'search') {
      if (!data[chartConfig.entityType].search.length)
        return setChartData({});

      const labels = data[chartConfig.entityType].search.map((entity) => {
        const entityName = entity[chartConfig.entityType === 'items' ? 'item' : 'category'].name

        if (query !== '')
          return entityName.toLowerCase().includes(query) ? entityName : '';

        return entityName;
      });
      const counts = data[chartConfig.entityType].search.map((entity) => {
        if (query !== '')
          return entity[chartConfig.entityType === 'items' ? 'item' : 'category'].name.toLowerCase().includes(query)
            ? entity.count
            : 0;

        return entity.count;
      });

      const datasets = [
        {
          label: `Relatório de buscas por ${chartConfig.entityType === 'items' ? 'itens' : 'categorias'}`,
          data: counts,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
      ];

      setChartData({ labels, datasets });
    }

    if (chartConfig.type === 'sales') {
      if (!data[chartConfig.entityType].sales.length)
        return setChartData({});

      const labels = data[chartConfig.entityType].sales.map((entity) => {
        const entityName = entity[chartConfig.entityType === 'items' ? 'item' : 'category'].name;

        if (query !== '')
          return entityName.toLowerCase().includes(query) ? entityName : '';

        return entityName;
      });
      const counts = data[chartConfig.entityType].sales.map((entity) => {
        if (query !== '')
          return entity[chartConfig.entityType === 'items' ? 'item' : 'category'].name.toLowerCase().includes(query)
            ? entity.count
            : 0;

        return entity.count;
      });

      const datasets = [
        {
          label: "Relatório de vendas de itens",
          data: counts,
          backgroundColor: "rgba(23, 150, 150, 0.5)",
        },
      ];

      setChartData({ labels, datasets });
    }
  }, [data, chartConfig, query]);

  const handleReload = async () => {
    const realoadingDataToast = toast.loading('Recarregando dados...', {
      autoClose: false
    });

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
    return <Loading title="Buscando dados" style={{ marginTop: "15rem" }} />;

  if ((data?.searchReports?.length === 0 && data?.salesReports?.length === 0) || error)
    return 
      <ErrorFinding
        text="Desculpe, parece que nenhum relatório foi encontrado"
        style={{ marginTop: "12rem" }}
      />
    

  return (
    <div className='reports-page'>
      <div className="chart-container">
        <div className='reports-filters'>
          <input
            className='reports-search-bar'
            type="text"
            placeholder='Buscar'
            onChange={e => setQuery(e.target.value.trim().toLowerCase())}
          />

          <select
            defaultValue='search'
            onChange={
              e => setChartConfig(prev => ({ ...prev, type: e.target.value }))
            }
          >
            <option value="search">Relatório de buscas</option>
            <option value="sales">Relatório de vendas</option>
          </select>

          <select
            defaultValue='items'
            onChange={
              e => setChartConfig(prev => ({ ...prev, entityType: e.target.value }))
            }
          >
            <option value="items">Itens</option>
            <option value="categories">Categorias</option>
          </select>

          <button className='reload-button' onClick={handleReload}>
            <p>Recarregar</p>
            <img src={reloadIcon} alt="Reload" />
          </button>
        </div>

        <div className="charts">
          {chartData && chartData.labels && chartData.datasets && (
            <ReportsChart
              type={chartConfig.type}
              data={chartData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Reports;