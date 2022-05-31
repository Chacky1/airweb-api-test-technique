import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createHash } from 'crypto';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UsersRepositoryFake } from './users.repository.fake';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useClass: UsersRepositoryFake,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
  });

  describe('listing all users', () => {
    it('returns all the users', () => {
      const existingUsers: any = [
        {
          id: +faker.random.numeric(),
          name: faker.name.firstName(),
          email: faker.internet.email(),
          password_hash: createHash('md5').update('bonjour').digest('hex'),
        },
        {
          id: +faker.random.numeric(),
          name: faker.name.firstName(),
          email: faker.internet.email(),
          password_hash: createHash('md5').update('bonjour').digest('hex'),
        },
      ];

      const usersRepositoryFindAllSpy = jest
        .spyOn(usersRepository, 'find')
        .mockReturnValue(existingUsers);

      const result = usersService.findAll();

      expect(result).toBe(existingUsers);
    });
  });

  describe('finding a user', () => {
    it('returns the found user', () => {
      const userId = +faker.random.numeric();
      const existingUser: any = {
        id: userId,
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password_hash: createHash('md5').update('bonjour').digest('hex'),
      };

      const usersRepositoryFindOneSpy = jest
        .spyOn(usersRepository, 'findOne')
        .mockReturnValue(existingUser);

      const result = usersService.findOneById(userId);

      expect(result).toBe(existingUser);
      expect(usersRepositoryFindOneSpy).toHaveBeenCalledWith(userId);
    });
  });

  describe('creating a user', () => {
    it('calls the repository with correct parameters', () => {
      const savedUser: any = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password_hash: createHash('md5').update('bonjour').digest('hex'),
      };

      const usersRepositorySaveSpy = jest
        .spyOn(usersRepository, 'save')
        .mockReturnValue(savedUser);

      const result = usersService.create(savedUser);

      expect(usersRepositorySaveSpy).toBeCalledWith(savedUser);
      expect(result).toEqual(savedUser);
    });
  });

  describe('updating a user', () => {
    it('calls the repository with correct parameters', async () => {
      const updatedUserId = +faker.random.numeric();
      const updatedUser: any = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password_hash: createHash('md5').update('bonjour').digest('hex'),
      };

      const usersRepositoryUpdateSpy = jest.spyOn(usersRepository, 'update');

      await usersService.update(updatedUserId, updatedUser);

      expect(usersRepositoryUpdateSpy).toHaveBeenCalledWith(
        updatedUserId,
        updatedUser,
      );
    });
  });

  describe('removing a user', () => {
    it('calls the repository with correct parameters', async () => {
      const removedUserId = +faker.random.numeric();

      const usersRepositoryRemoveSpy = jest.spyOn(usersRepository, 'delete');

      await usersService.remove(removedUserId);

      expect(usersRepositoryRemoveSpy).toHaveBeenCalledWith(removedUserId);
    });
  });
});
