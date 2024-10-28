import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserModel = { create: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => expect(service).toBeDefined());

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

      mockUserModel.create.mockResolvedValue(mockUser);

      const result = await service.create(userData);

      expect(result).toEqual(mockUser);
      expect(mockUserModel.create).toHaveBeenCalledTimes(1);
      expect(mockUserModel.create).toHaveBeenCalled();
      // expect(mockUserModel.create).toHaveBeenCalledWith(userData);
    });
  });
});
