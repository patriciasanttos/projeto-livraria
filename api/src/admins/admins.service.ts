import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

import CreateAdminBody from "./dtos/create-admin";
import UpdateAdminBody from "./dtos/update-admin";
import { DecodedUserTokenType } from "src/@types/decodedUserToken.type";

interface JwtPayload extends DefaultJwtPayload {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.admin.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  private async getById(adminId: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: adminId },
    });

    if (!admin)
      throw new HttpException(
        { message: "Admin not found" },
        HttpStatus.NOT_FOUND
      );

    return admin;
  }

  async login(email: string, password: string) {
    const admin = await this.prisma.admin.findFirst({
      where: { email },
    });
    if (!admin)
      throw new HttpException(
        { message: "Admin not found" },
        HttpStatus.NOT_FOUND
      );

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid)
      throw new HttpException(
        { message: "Invalid password" },
        HttpStatus.UNAUTHORIZED
      );

    const token = jwt.sign(
      {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
      process.env.JWT_KEY as string
    );

    return token;
  }

  async validate(cookie: string | undefined) {
    if (!cookie)
      throw new HttpException(
        { message: "No token provided" },
        HttpStatus.UNAUTHORIZED
      );

    let decodedUserCookie: JwtPayload;
    try {
      decodedUserCookie = jwt.verify(
        cookie,
        process.env.JWT_KEY as string
      ) as JwtPayload;
    } catch (e) {
      throw new HttpException(
        { message: "Invalid token" },
        HttpStatus.UNAUTHORIZED
      );
    }

    const admin = await this.prisma.admin.findFirst({
      where: { email: decodedUserCookie.email },
    });
    if (!admin)
      throw new HttpException(
        { message: "Admin not found" },
        HttpStatus.NOT_FOUND
      );

    return { id: admin.id };
  }

  async create(data: CreateAdminBody) {
    const adminExists = await this.prisma.admin.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      },
    });
    if (adminExists)
      throw new HttpException(
        { message: "Admin with the same email or phone already exists" },
        HttpStatus.CONFLICT
      );

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(data.password, salt);

    await this.prisma.admin.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashPassword,
      },
    });

    return {
      message: "Admin created successfully",
    };
  }

  async update(token: DecodedUserTokenType, data: UpdateAdminBody) {
    const admin = await this.getById(Number(data.id));

    const adminExists = await this.prisma.admin.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
        id: { not: Number(data.id) },
      },
    });
    if (adminExists)
      throw new HttpException(
        { message: "Admin with the same email or phone already exists" },
        HttpStatus.CONFLICT
      );

    let hashedPassword = admin.password;
    if (data.newPassword) {
      const salt = await bcrypt.genSalt(12);
      hashedPassword = await bcrypt.hash(data.newPassword, salt);
    }

    const updatedUser = await this.prisma.admin.update({
      where: {
        id: Number(data.id),
      },
      data: {
        name: data.name !== undefined ? data.name : admin.name,
        email: data.email !== undefined ? data.email : admin.email,
        phone: data.phone !== undefined ? data.phone : admin.phone,
        password:
          data.newPassword !== undefined ? hashedPassword : admin.password,
      },
    });

    const response: { token?: string; message: string } = {
      message: "Admin updated successfully",
    };
    if (updatedUser.id === token.id) {
      const newToken = jwt.sign(
        {
          id: admin.id,
          name: admin.name,
          email: admin.email,
        },
        process.env.JWT_KEY as string
      );

      response.token = newToken;
    }

    return response;
  }

  async delete(token: DecodedUserTokenType, adminId: number) {
    await this.getById(adminId);

    await this.prisma.admin.delete({ where: { id: adminId } });

    const response: { message: string; logout?: boolean } = {
      message: "Admin deleted successfully",
    };
    if (adminId === token.id) response.logout = true;

    return response;
  }
}
