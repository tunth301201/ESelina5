import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  @Roles('seller')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @Roles('seller')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get(':id')
  @Roles('seller', 'customer')
  async getUserById(@Param('id') userId: string) {
    return await this.userService.getUserById(userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/profile/:id')
  @Roles('seller', 'customer')
  async getUserProfile(@Request() req: any) {
    const userId = req.user.sub;
    const user = await this.userService.getUserById(userId);
    return user;
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put()
  @Roles('seller', 'customer')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req: any) {
    return await this.userService.updateUser(req.user.sub, updateUserDto);
  }


  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put('/change-password')
  @Roles('seller', 'customer')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto, @Request() req: any): Promise<void> {
    return await this.userService.changePassword(req.user.sub, changePasswordDto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @Roles('seller')
  async deleteUser(@Param('id') userId: string) {
      return await this.userService.deleteUser(userId);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('/search')
  @Roles('seller')
  async searchUser(@Query('keyword') keyword: string) {
      return await this.userService.searchUser(keyword);    
  }


  @Get('/user/totalUserThisMonth')
  async getTotalUserThisMonth() {
    return await this.userService.totalUserThisMonth();
  }

  @Get('/user/totalUser')
  async getTotalUser() {
    return await this.userService.totalUser();
  }
}
