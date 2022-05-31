import { describe, it } from '@jest/globals';
import Index from '../index';
import { shallow } from 'enzyme';

import InstantTemplateProvider from "@components/InstantTemplate/context";
import FilterView from "@components/InstantTemplate";
import {
  COLUMNS_TABLE_EXAMPLE,
  MODULE_FORMS_EXAMPLE,
} from "@components/Example/config";

jest.mock('@components/InstantTemplate/context', () => () => <div data-testid="InstantTemplate" />);
jest.mock('@components/InstantTemplate', () => () => <div data-testid="InstantTemplate" />);

describe('App Test', () => {

  it('Run render on index', () => {
    shallow(<Index/>);
  });

});