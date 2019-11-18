import React from 'react';
import mockAxios from "axios";
import parser, { axiosGet, getPageNumberFromURL } from './parser';
import episodeJSON from '../mocks/episode.json';
import locationJSON from '../mocks/location.json';
import characterJSON from '../mocks/sample.json';

let mergedJSON = Object.assign(locationJSON, characterJSON);
mergedJSON = Object.assign(mergedJSON, episodeJSON);

jest.mock('axios', () => jest.fn());

mockAxios.get = jest.fn(async () => {
  return Promise.resolve({
    status: 200,
    data: mergedJSON
  })
});


describe('Parser tests', () => {
  it('should return a promise when calling axiosGet', () => {
    const result = axiosGet('url', true);
    expect(result.then).toBeDefined();
  });

  it('should return the page number from the url', () => {
    let url = 'https://rickandmortyapi.com/api/character/?page=2';
    const result = getPageNumberFromURL(url);
    expect(result).toEqual(2);
  });

  it('should parse one character and get all of its data', async () => {

    const handlerFn = jest.fn(async () => {
      return true;
    });
    const result = await parser(1, handlerFn);
    await expect(result).toBeTruthy;
  });

});
