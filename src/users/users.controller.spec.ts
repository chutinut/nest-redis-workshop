import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUserService = { create: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => expect(controller).toBeDefined());

  const _id = '000000000000000000000001';
  const userData = {
    username: 'john001',
    password: 'P@5$w0rd.',
    name: 'John Doe',
    email: 'john.d@example.com',
  };
  describe('create an user data', () => {
    it('should create a new user', async () => {
      const mockUser = { _id, ...userData };
      const mockResponse = { _id };
      mockUserService.create.mockResolvedValue(mockUser);

      const result = await controller.create(userData);

      expect(result).toEqual(mockResponse);
      expect(service.create).toHaveBeenCalledTimes(1);
      expect(service.create).toHaveBeenCalledWith(userData);
    });
  });
});
