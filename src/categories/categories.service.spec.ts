import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesRepositoryFake } from './categories.repository.fake';
import { CategoriesService } from './categories.service';
import { Categories } from './entities/categories.entity';

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let categoriesRepository: Repository<Categories>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getRepositoryToken(Categories),
          useClass: CategoriesRepositoryFake,
        },
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoriesRepository = module.get<Repository<Categories>>(
      getRepositoryToken(Categories),
    );
  });

  describe('listing all categories', () => {
    it('returns all the categories', () => {
      const existingCategories: any = [
        {
          id: +faker.random.numeric(),
          index: +faker.random.numeric(),
          label: faker.word.noun(),
          description: faker.lorem.text(),
        },
        {
          id: +faker.random.numeric(),
          index: +faker.random.numeric(),
          label: faker.word.noun(),
          description: faker.lorem.text(),
        },
      ];

      const categoriesRepositoryFindAllSpy = jest
        .spyOn(categoriesRepository, 'find')
        .mockReturnValue(existingCategories);

      const result = categoriesService.findAll();

      expect(result).toBe(existingCategories);
    });
  });

  describe('finding a category', () => {
    it('returns the found category', () => {
      const categoryId = +faker.random.numeric();
      const existingCategory: any = {
        id: categoryId,
        index: +faker.random.numeric(),
        label: faker.word.noun(),
        description: faker.lorem.text(),
      };

      const categoriesRepositoryFindOneSpy = jest
        .spyOn(categoriesRepository, 'findOne')
        .mockReturnValue(existingCategory);

      const result = categoriesService.findOne(categoryId);

      expect(result).toBe(existingCategory);
      expect(categoriesRepositoryFindOneSpy).toHaveBeenCalledWith(categoryId);
    });
  });

  describe('creating a category', () => {
    it('calls the repository with correct parameters', () => {
      const savedCategory: any = {
        index: +faker.random.numeric(),
        label: faker.word.noun(),
        description: faker.lorem.text(),
      };

      const categoriesRepositorySaveSpy = jest
        .spyOn(categoriesRepository, 'save')
        .mockReturnValue(savedCategory);

      const result = categoriesService.create(savedCategory);

      expect(categoriesRepositorySaveSpy).toBeCalledWith(savedCategory);
      expect(result).toEqual(savedCategory);
    });
  });

  describe('updating a category', () => {
    it('calls the repository with correct parameters', async () => {
      const updatedCategoryId = +faker.random.numeric();
      const updatedCategory: any = {
        index: +faker.random.numeric(),
        label: faker.word.noun(),
        description: faker.lorem.text(),
      };

      const productRepositoryUpdateSpy = jest.spyOn(
        categoriesRepository,
        'update',
      );

      await categoriesService.update(updatedCategoryId, updatedCategory);

      expect(productRepositoryUpdateSpy).toHaveBeenCalledWith(
        updatedCategoryId,
        updatedCategory,
      );
    });
  });

  describe('removing a category', () => {
    it('calls the repository with correct parameters', async () => {
      const removedCategoryId = +faker.random.numeric();

      const categoriesRepositoryRemoveSpy = jest.spyOn(
        categoriesRepository,
        'delete',
      );

      await categoriesService.remove(removedCategoryId);

      expect(categoriesRepositoryRemoveSpy).toHaveBeenCalledWith(
        removedCategoryId,
      );
    });
  });
});
