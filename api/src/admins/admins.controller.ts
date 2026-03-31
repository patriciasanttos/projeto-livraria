import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { AdminsService } from "./admins.service";
import CreateAdminBody from "./dtos/create-admin";
import UpdateAdminBody from "./dtos/update-admin";
import { Request, Response } from "express";
import { AuthGuard } from "src/auth.guard";
import { DecodedUserTokenType } from "src/@types/decodedUserToken.type";

@Controller("admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  @UseGuards(AuthGuard)
  //----Swagger configs
  @ApiOperation({
    summary: "Get all admins",
    description: "Get all admins with a name, email and phone.",
    tags: ["admins"],
  })
  @ApiOkResponse({
    description: "A list of all admins",
  })
  //-----
  getAll() {
    return this.adminsService.getAll();
  }

  @Get("/login")
  //----Swagger configs
  @ApiOperation({
    summary: "Login in a admin account",
    description: "Login in a admin account with a email and a password.",
    tags: ["admins"],
  })
  @ApiOkResponse({
    description: "User logged in successfully",
  })
  //-----
  async login(
    @Headers("authorization") authHeader: string,
    @Res() response: Response
  ) {
    const [email, password] = authHeader.split(":");

    const token = await this.adminsService.login(email, password);

    response.cookie("user", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      path: "/",
    });

    response.send({ message: "User logged in successfully" });
  }

  @Get("/logout")
  @UseGuards(AuthGuard)
  //----Swagger configs
  @ApiOperation({
    summary: "Logout a admin account",
    tags: ["admins"],
  })
  @ApiOkResponse({
    description: "User logged out successfully",
  })
  //-----
  logout(@Res() response: Response) {
    response.clearCookie("user", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    response.send({ message: "User logged out successfully" });
  }

  @Get("/auth/me")
  //----Swagger configs
  @ApiOperation({
    summary: "Validate an admin account",
    description: "Validate an admin account with a cookie.",
    tags: ["admins"],
  })
  @ApiOkResponse({
    description: "User validated successfully",
  })
  //-----
  async validate(@Req() { cookies: { user } }: Request) {
    return this.adminsService.validate(user);
  }

  @Post()
  @UseGuards(AuthGuard)
  //----Swagger configs
  @ApiOperation({
    summary: "Create a new admin",
    description: "Create a new admin with a name, email, phone and password.",
    tags: ["admins"],
  })
  @ApiCreatedResponse({
    description: "Admin created successfully",
  })
  //-----
  createAdmin(@Body() data: CreateAdminBody) {
    return this.adminsService.create(data);
  }

  @Put()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("image"))
  //----Swagger configs
  @ApiOperation({
    summary: "Update a admin",
    description: "Update an admin with a name, email, phone or password.",
    tags: ["admins"],
  })
  @ApiOkResponse({
    description: "Admin updated successfully",
  })
  //-----
  async updateAdmin(
    @Req() request: Request,
    @Res() response: Response,
    @Body() data: UpdateAdminBody
  ) {
    const updatedAdmin = await this.adminsService.update(
      request.token as DecodedUserTokenType,
      data
    );

    if (updatedAdmin.token)
      response.cookie("user", updatedAdmin.token, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: "none",
        path: "/",
      });

    response.send({ message: updatedAdmin.message });
  }

  @Delete(":adminId")
  @UseGuards(AuthGuard)
  //----Swagger configs
  @ApiParam({
    name: "adminId",
    required: true,
    description: "Admin ID",
    example: 1,
  })
  @ApiOperation({
    summary: "Delete a admin",
    description: "Delete an admin with a id",
    tags: ["admins"],
  })
  @ApiOkResponse({
    description: "Admin deleted successfully",
  })
  //-----
  async deleteAdmin(
    @Req() request: Request,
    @Param("adminId", ParseIntPipe) adminId: number,
    @Res() response: Response
  ) {
    const deletedAdmin = await this.adminsService.delete(
      request.token as DecodedUserTokenType,
      adminId
    );

    if (deletedAdmin.logout)
      response.clearCookie("user", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/",
      });

    return response.send({ message: deletedAdmin.message });
  }
}
