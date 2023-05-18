import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const createdUser = new this.userModel({
        ...createUserDto,
        birthday: new Date(parseInt(createUserDto.birthday)),
        password: hashedPassword,
        });
        return createdUser.save();
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userModel.findById(userId).exec();
        return user;
    }

    async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.getUserById(userId);
        user.firstname = updateUserDto.firstname;
        user.lastname = updateUserDto.lastname;
        user.gender = updateUserDto.gender;
        user.birthday = new Date(parseInt(updateUserDto.birthday));
        user.phone = updateUserDto.phone;
        user.address = updateUserDto.address;
        return user.save();
    }

    async changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
        const user = await this.getUserById(userId);
        const isPasswordMatch = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
        if (!isPasswordMatch) {
        throw new UnauthorizedException('Invalid credentials');
        }
        user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
        await user.save();
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
        }
        return user;
    }

    async deleteUser(userId: string): Promise<any> {
        return this.userModel.findByIdAndDelete(userId).exec();
    }

    async getAllUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async searchUser(keyword: string): Promise<User[]> {
        const regex = new RegExp(keyword, 'i');
        const users = await this.userModel.find({
            $or: [
                { email: { $regex: regex } },
                { firstname: { $regex: regex } },
                { lastname: { $regex: regex } },
                { address: { $regex: regex } },
                { phone: { $regex: regex } },
            ],
        }).exec();
        return users;
    }

    async formatDateInput(inputDate: string): Promise<Date> {
        const [month, day, year] = inputDate.split('-').map((str) => parseInt(str));
        return new Date(year, month - 1, day);
    }

    async totalUserThisMonth(): Promise<{total: number, percentChange: number}> {
        // get current year and month
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
    
        // get first day of current month
        const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1);
    
        // get first day of previous month
        const firstDayOfPreviousMonth = new Date(currentYear, currentMonth - 2, 1);
    
        // get total number of users created this month
        const totalCurrentMonthUsers = await this.userModel.countDocuments({
            createdAt: { $gte: firstDayOfMonth, $lte: new Date() }
        });
    
        // get total number of users created in the previous month
        const totalPreviousMonthUsers = await this.userModel.countDocuments({
            createdAt: { $gte: firstDayOfPreviousMonth, $lte: new Date(firstDayOfMonth.getTime() - 1) }
        });
    
        // calculate the percentage change
        const percentChange = ((totalCurrentMonthUsers - totalPreviousMonthUsers) / totalPreviousMonthUsers) * 100;
    
        return { total: totalCurrentMonthUsers, percentChange };
    }

    async totalUser(): Promise<number> {
        const totalUsers = await this.userModel.countDocuments().exec();
        return totalUsers;
      }
      
    
    
}
