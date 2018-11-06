import E, { shallow as s } from 'enzyme'
import { expect as e } from 'chai'
import A from 'enzyme-adapter-react-16'
import R from 'react'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

const ma = new MockAdapter(axios)
E.configure({ adapter: new A()})

export const Enzyme = E
export const shallow = s
export const expect = e
export const React = R
export const mockAxios = ma
