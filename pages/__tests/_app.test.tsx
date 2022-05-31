import { describe, it } from '@jest/globals';
import MyApp from '../_app';
import { shallow } from 'enzyme';

describe('App Test', () => {

  it('Run render on _app', () => {
    //@ts-ignore
    shallow(<MyApp Component='div' pageProps={null}/>);
  });

});