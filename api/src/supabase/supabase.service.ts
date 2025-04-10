import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as sharp from 'sharp';

@Injectable()
export class SupabaseService {
  private supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SECRET as string,
  );
  private async ensureBucketExists(bucketName: string) {
    const { data, error } = await this.supabase.storage.getBucket(bucketName);

    if (!data && error?.message === 'Bucket not found') {
      const { error: createError } = await this.supabase.storage.createBucket(
        bucketName,
        {
          public: true,
        },
      );
      if (createError) throw createError;
    }
  }

  async uploadImage(
    bucket: string,
    buffer: Buffer,
    path: string,
    mimetype: string,
  ) {
    await this.ensureBucketExists(bucket);

    const compressed = await sharp(buffer)
      .resize(800)
      .jpeg({ quality: 80 })
      .toBuffer();

    const { error } = await this.supabase.storage
      .from(bucket)
      .upload(path, compressed, {
        contentType: mimetype,
        upsert: true,
      });

    if (error)
      throw new HttpException(
        { message: 'Error saving image', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const publicUrl = this.supabase.storage.from(bucket).getPublicUrl(path)
      .data.publicUrl;

    return publicUrl;
  }

  async deleteImages(bucket: string, paths: Array<string>) {
    const { error } = await this.supabase.storage.from(bucket).remove(paths);

    if (error)
      throw new HttpException(
        { message: 'Error deleting images', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
  }
}
