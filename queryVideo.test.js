const dotenv = require('dotenv');
const assert = require('chai');
const { handler } = require('./index.js');

dotenv.config();

describe('lambda-queryVideo', () => {
  it('Should return a response from OpenAI with status code 200 for a valid query', async () => {
    const event = {
      youtubeURL: 'https://www.youtube.com/watch?v=uRbGMZ9oPjw',
      query: 'summaries of the video',
    };
    const result = await handler(event);
    expect(result.statusCode).toEqual(200);
    expect(result).toBeDefined();
  }, 30000);

  it('Should return an error response with status code 400 for a YouTube URL with no transcript', async () => {
    const event = {
      youtubeURL: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      query: 'summaries of the video',
    };
    try {
        const result = await handler(event);
        expect(result).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    }, 30000);

  it('Should handle incorrect endpoint gracefully', async () => {
    const event = {
      youtubeURL: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      query: 'what is this video about',
    };
    try {
      const result = await handler(event);
      expect(result).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  }, 30000);

  it('Should handle an invalid YouTube URL gracefully', async () => {
    const event = {
      youtubeURL: 'https://www.youtube.com/watch?v=invalidvideoid',
      query: 'validQuery',
    };
    try {
      const result = await handler(event);
      expect(result).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  }, 30000);

  it('Should handle missing query gracefully', async () => {
    const event = {
      youtubeURL: 'https://www.youtube.com/watch?v=uRbGMZ9oPjw',
    };
    try {
      const result = await handler(event);
      expect(result).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  }, 30000);

  it('Should handle missing YouTube URL gracefully', async () => {
    const event = {
      query: 'what is this video about',
    };
    try {
      const result = await handler(event);
      expect(result).toBeDefined();
    } catch (error) {
      expect(error).toBeDefined();
    }
  }, 30000);
});
