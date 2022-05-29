import { Test, TestingModule } from '@nestjs/testing';
import crypto from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const testCreateUser: CreateUserDto = {
    id: 1,
    name: 'toto',
    email: 'toto@airweb.fr',
    password_hash: 'bonjour',
  };

  const testUpdateUser: UpdateUserDto = {
    id: 1,
    name: 'totoWeb',
    email: 'toto@airweb.fr',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create method should return the complete user', async () => {
    jest.spyOn(service, 'create');
    const user: CreateUserDto = await service.create(testCreateUser);
    expect(user.id).toBeDefined();
    expect(user.email).toBe(testCreateUser.email);
    expect(user.name).toBe(testCreateUser.name);
    expect(user.password_hash).toBe(
      crypto
        .createHash('md5')
        .update(testCreateUser.password_hash)
        .digest('hex'),
    );
  });
});
