import supertest from 'supertest';
import app from '../index';
import utls from '../api/routes/utilities/utls';
import path from 'path';

const request = supertest(app);

describe('Test endpoint response', () => {
  it('Get /api response', () => {
    request.get('/api').then((res) => {
      expect(res.status).toBe(200);
    });
  });
});

describe('Test endpoint image resize process', () => {
  it('Success resize', async () => {
    await request.get('/api/resize?filename=fjord&width=233&heigh=432').then((res) => {
      expect(res.status).toBe(200);
    });
  });

  it('Missing or invalid width parameter', async () => {
    await request.get('/api/resize?filename=fjord&width=&heigh=432').then((res) => {
      expect(res.text).toBe('Please enter valid width');
    });
  });

  it('Missing or invalid heigh parameter', async () => {
    await request.get('/api/resize?filename=fjord&width=200&heigh=').then((res) => {
      expect(res.text).toBe('Please enter valid heigh');
    });
  });

  it('Missing or invalid filename parameter', async () => {
    await request.get('/api/resize?filename=&width=200&heigh=200').then((res) => {
      expect(res.text).toBe('Invalid filename');
    });
  });
});

describe('Test Sharp resize function', () => {
  it('Success ResizeImage', async () => {
    const inFileName = path.resolve('.', 'src', 'api', 'routes', 'resize', 'assets', 'fjord.jpg');
    const outFilePath = path.resolve('.', 'src', 'api', 'routes', 'resize', 'cache');
    expect(await utls.ResizeImage(inFileName, 500, 500, outFilePath)).toBeTruthy;
  });

  it('Resize function not threw in case of invalid input', () => {
    expect(async () => {
      const inFileName = '';
      const outFilePath = '';
      await utls.ResizeImage(inFileName, -2, 500, outFilePath);
    }).not.toThrow();
  });
});
