import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles('seller')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Post()
  @Roles('seller')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Get(':id')
  @Roles('seller', 'customer')
  async getUserById(@Param('id') userId: string) {
    return await this.userService.getUserById(userId);
  }

  // @UseGuards(AuthGuard('jwt'), RolesGuard)
  // @Get('/profile')
  // @Roles('seller', 'customer')
  // async getUserProfile(@Request() req: any) {
  //   const userId = req.user.sub;
  //   console.log("userId", req.user.sub)
  //   return await this.userService.getUserById(userId.toString());
  // }

  @Patch(':id')
  @Roles('seller', 'customer')
  async updateUser(@Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Patch(':id/change-password')
  @Roles('seller', 'customer')
  async changePassword(@Param('id') userId: string, @Body() changePasswordDto: ChangePasswordDto): Promise<void> {
    return await this.userService.changePassword(userId, changePasswordDto);
  }

  @Delete(':id')
    @Roles('seller')
    async deleteUser(@Param('id') userId: string) {
        return await this.userService.deleteUser(userId);
    }

    @Get('/search')
    @Roles('seller')
    async searchUser(@Query('keyword') keyword: string) {
        return await this.userService.searchUser(keyword);    
    }
}
