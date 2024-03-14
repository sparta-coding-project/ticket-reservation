import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { JwtStrategy } from "./jwt.strategy";
import { LoginDto } from "./dto/login-auth.dto";
import { AuthService } from "./auth.service";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtStrategy: JwtStrategy
  ){}

  @Post("login")
  @HttpCode(201)
  async login(@Body() loginDto:LoginDto, @Res({ passthrough: true }) res: Response){
    const tokens = await this.authService.getToken(loginDto)
    res.cookie("Authorization", tokens.accessToken)
    return tokens
  }
}