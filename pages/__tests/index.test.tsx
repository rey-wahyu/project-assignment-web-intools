import { describe, it } from '@jest/globals';
import Index from '../index';
import { shallow } from 'enzyme';

describe('App Test', () => {

  it('Run render on index', () => {
    shallow(<Index/>);
  });

});