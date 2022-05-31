import { Test, TestingModule } from '@nestjs/testing';
import { Products } from './entities/products.entity';
import { ProductsService } from './products.service';
import { ProductsRepositoryFake } from './products.repository.fake';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productsRepository: Repository<Products>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Products),
          useClass: ProductsRepositoryFake,
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<Repository<Products>>(
      getRepositoryToken(Products),
    );
  });

  describe('listing all products', () => {
    it('returns all the products', () => {
      const existingProducts: any = [
        {
          id: +faker.random.numeric(),
          label: faker.word.noun,
          description: faker.lorem.text(),
          category_id: +faker.random.numeric(),
          thumbnail_url: faker.internet.url(),
          visible_public: true,
          visible_authenticated: true,
        },
        {
          id: +faker.random.numeric(),
          label: faker.word.noun,
          description: faker.lorem.text(),
          category_id: +faker.random.numeric(),
          thumbnail_url: faker.internet.url(),
          visible_public: false,
          visible_authenticated: true,
        },
      ];

      const productsRepositoryFindAllSpy = jest
        .spyOn(productsRepository, 'find')
        .mockReturnValue(existingProducts);

      const result = productsService.findAll();

      expect(result).toBe(existingProducts);
    });
  });

  describe('finding a product', () => {
    it('returns the found product', () => {
      const productId = +faker.random.numeric();
      const existingProduct: any = {
        id: productId,
        label: faker.word.noun,
        description: faker.lorem.text(),
        category_id: +faker.random.numeric(),
        thumbnail_url: faker.internet.url(),
        visible_public: false,
        visible_authenticated: true,
      };

      const productsRepositoryFindOneSpy = jest
        .spyOn(productsRepository, 'findOne')
        .mockReturnValue(existingProduct);

      const result = productsService.findOne(productId);

      expect(result).toBe(existingProduct);
      expect(productsRepositoryFindOneSpy).toHaveBeenCalledWith(productId);
    });
  });

  describe('creating a product', () => {
    it('calls the repository with correct parameters', () => {
      const savedProduct: any = {
        label: faker.word.noun,
        description: faker.lorem.text(),
        category_id: +faker.random.numeric(),
        thumbnail_url: faker.internet.url(),
        visible_public: false,
        visible_authenticated: true,
      };

      const productsRepositorySaveSpy = jest
        .spyOn(productsRepository, 'save')
        .mockReturnValue(savedProduct);

      const result = productsService.create(savedProduct);

      expect(productsRepositorySaveSpy).toBeCalledWith(savedProduct);
      expect(result).toEqual(savedProduct);
    });
  });

  describe('updating a product', () => {
    it('calls the repository with correct parameters', async () => {
      const updatedProductId = +faker.random.numeric();
      const updatedProduct: any = {
        label: faker.word.noun,
        description: faker.lorem.text(),
        category_id: +faker.random.numeric(),
        thumbnail_url: faker.internet.url(),
        visible_public: false,
        visible_authenticated: true,
      };

      const productRepositoryUpdateSpy = jest.spyOn(
        productsRepository,
        'update',
      );

      await productsService.update(updatedProductId, updatedProduct);

      expect(productRepositoryUpdateSpy).toHaveBeenCalledWith(
        updatedProductId,
        updatedProduct,
      );
    });
  });

  describe('removing a product', () => {
    it('calls the repository with correct parameters', async () => {
      const removedProductId = +faker.random.numeric();

      const productsRepositoryRemoveSpy = jest.spyOn(
        productsRepository,
        'delete',
      );

      await productsService.remove(removedProductId);

      expect(productsRepositoryRemoveSpy).toHaveBeenCalledWith(
        removedProductId,
      );
    });
  });
});
