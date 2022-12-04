import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { SelectIt } from '../src'
const options = {
  searchable: true,
  labelField: 'name',
  valueField: 'code',
  data: [
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Zimbabwe', code: 'ZW' },
  ],
  selected: ['AF'],
}

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<SelectIt options={options} />)
  })
})
