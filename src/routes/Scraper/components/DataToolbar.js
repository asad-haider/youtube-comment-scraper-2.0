import React, { Component, PropTypes } from 'react'
import { Checkbox, Tooltip, Position, Tabs, TabList, Tab, TabPanel } from '@blueprintjs/core'

import defaultColumns from './CommentTable/columns'
import './DataToolbar.scss'

class DataToolbar extends Component {
  displayName: 'DataToolbar'
  propTypes: {
    resultEditor: PropTypes.object.isRequired,
    loading: PropTypes.boolean,
    toggleColumn: PropTypes.func,
    setIncludeReplies: PropTypes.func,
    setRepliesCollapsed: PropTypes.func
  }
  defaultProps: {
    loading: true,
    toggleColumn: () => {},
    setIncludeReplies: () => {},
    setRepliesCollapsed: () => {}
  }

  constructor (props) {
    super(props)
    this.renderCommentsTab = this.renderCommentsTab.bind(this)
    this.renderRepliesTab = this.renderRepliesTab.bind(this)
    this.renderColumnCheckbox = this.renderColumnCheckbox.bind(this)
    this.toggleColumn = this.toggleColumn.bind(this)
    this.setIncludeReplies = this.setIncludeReplies.bind(this)
    this.setRepliesCollapsed = this.setRepliesCollapsed.bind(this)
  }

  render () {
    return (
      <div className='data-toolbar-component'>
        <Tabs className='pt-vertical'>
          <TabList>
            <Tab>Comments</Tab>
            <Tab>Replies</Tab>
          </TabList>
          {this.renderCommentsTab()}
          {this.renderRepliesTab()}
        </Tabs>
      </div>
    )
  }

  renderCommentsTab () {
    const { resultEditor } = this.props
    const { columns } = resultEditor.toObject()

    return (
      <TabPanel>
        <div className='data-toolbar-tab-panel'>
          <div className='row'>
            {defaultColumns.filter(c => !/^reply_/.test(c.key)).map(c =>
              this.renderColumnCheckbox(c, (columns.getIn([c.key, 'active']))))
            }
          </div>
        </div>
      </TabPanel>
    )
  }

  renderRepliesTab () {
    const { resultEditor } = this.props
    const { columns, includeReplies, repliesCollapsed } = resultEditor.toObject()

    return (
      <TabPanel>
        <div className='data-toolbar-tab-panel'>
          <div className='row'>
            {this.renderCheckbox({
              label: 'Include Replies',
              checked: includeReplies,
              onChange: this.setIncludeReplies,
              tooltip: 'Include comment replies.'
            })}

            {this.renderCheckbox({
              disabled: !includeReplies,
              label: 'Collapse Replies',
              checked: repliesCollapsed,
              onChange: this.setRepliesCollapsed,
              tooltip: 'Treat replies the same as regular comments.'
            })}
          </div>
          <hr />
          <div className='row'>
            {defaultColumns.filter(c => /^reply_/.test(c.key)).map(c => {
              const active = columns.getIn([c.key, 'active'])
              const disabled = !includeReplies || repliesCollapsed
              return this.renderColumnCheckbox(c, active, disabled)
            })}
          </div>
        </div>
      </TabPanel>
    )
  }

  renderColumnCheckbox (c, active, disabled = false) {
    return this.renderCheckbox({
      key: `column_${c.key}`,
      name: c.key,
      checked: active,
      label: c.name,
      disabled: disabled,
      onChange: this.toggleColumn,
      tooltip: `Include '${c.name}' column`
    })
  }

  renderCheckbox ({ key, name, disabled, onChange, checked, label, tooltip }) {
    const checkboxElem = (
      <Checkbox
        name={name}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        label={label} />
    )

    return (
      <div key={key} className='col-sm-6 col-md-3 col-lg-2 data-toolbar-switch'>
        {tooltip
          ? <Tooltip content={tooltip} position={Position.BOTTOM}>{checkboxElem}</Tooltip>
          : checkboxElem
        }
      </div>
    )
  }

  toggleColumn (e) {
    this.props.toggleColumn(e.target.name)
  }

  setIncludeReplies (e) {
    this.props.setIncludeReplies(e.target.checked)
  }

  setRepliesCollapsed (e) {
    this.props.setRepliesCollapsed(e.target.checked)
  }
}

export default DataToolbar
