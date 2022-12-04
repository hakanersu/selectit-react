import React, { FC, useMemo, useState } from 'react'
import "../Style.css"

type DataEntity = {
  name: string
  code: string | number
}

type SelectorProps = {
  searchable: boolean
  labelField: string
  valueField: string
  data: DataEntity[]
  selected: (string | number)[]
}

type SelectorOptions = {
  options: SelectorProps
}

const SelectIt: FC<SelectorOptions> = (props) => {
  const [options, setOptions] = useState(props.options)

  const [searching, setSearching] = useState('')
  const [rightSearching, setRightSearching] = useState('')

  const changeSearching = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearching(e.target.value)
  }

  const changeRightSearching = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setRightSearching(e.target.value)
  }

  const selectedCount = useMemo(() => {
    return options.selected.length
  }, [options.selected])

  const leftList = () => {
    return notSelected.filter((item) => {
      return item.name.toLowerCase().indexOf(searching.toLowerCase()) !== -1
    })
  }

  const rightList = () => {
    return selectedItems.filter((item) => {
      return item.name.toLowerCase().indexOf(rightSearching.toLowerCase()) !== -1
    })
  }

  const unSelectedCount = useMemo(() => {
    return options.data.length - selectedCount
  }, [selectedCount])

  const selectedItems = options.data.filter((item) => {
    return options.selected.includes(item.code)
  })

  const notSelected = options.data.filter((item) => {
    return !options.selected.includes(item.code)
  })

  const addSelected = (code: string | number) => (_: React.MouseEvent) => {
    setOptions({
      ...options,
      selected: [...options.selected, code],
    })
  }
  const removeSelected = (code: string | number) => (_: React.MouseEvent) => {
    setOptions({
      ...options,
      selected: options.selected.filter((item) => {
        return item !== code
      }),
    })
  }

  const selectAll = () => {
    setOptions({
      ...options,
      selected: [...options.data.map((item) => item.code)],
    })
  }

  const deselectAll = () => {
    setOptions({
      ...options,
      selected: [],
    })
  }

  const leftInputValue = () => {
    return options.selected.join(',')
  }

  return (
    <div className='selectit h-64'>
      <div className='selectit-left'>
        <div className='selectit-search'>
          <span className='close left'>✕</span>
          {options.searchable && (
            <input type='search' placeholder='Search' value={searching} onChange={changeSearching} />
          )}
        </div>
        <div className='selectit-container'>
          <ul className='selectit-list'>
            {leftList().map((item) => (
              <li onClick={addSelected(item.code)} key={item.code}>
                {item.name}
              </li>
            ))}
          </ul>
          <div className='selectit-counter'>
            <span className='selectit-selectall' onClick={selectAll}>
              Select all
            </span>
            <span className='selectit-count'>{unSelectedCount}</span>
          </div>
        </div>
      </div>
      <div className='selectit-center'>‹ ›</div>
      <div className='selectit-right'>
        <div className='selectit-search'>
          <span className='close right'>✕</span>
          {options.searchable && (
            <input type='search' placeholder='Search' value={rightSearching} onChange={changeRightSearching} />
          )}
        </div>
        <div className='selectit-container'>
          <ul className='selectit-list'>
            {rightList().map((item) => (
              <li onClick={removeSelected(item.code)} key={item.code}>
                {item.name}
              </li>
            ))}
          </ul>
          <div className='selectit-counter'>
            <span className='selectit-deselect' onClick={deselectAll}>
              Deselect all
            </span>
            <span className='selectit-count'>{selectedCount}</span>
          </div>
        </div>
      </div>
      <input type='hidden' className='selectit-input' name='selectit-input' value={leftInputValue()} />
    </div>
  )
}

export default SelectIt
