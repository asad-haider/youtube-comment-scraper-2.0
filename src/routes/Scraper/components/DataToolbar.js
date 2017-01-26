import React, { Component, PropTypes } from 'react'
import { Switch, Tabs, TabList, Tab, TabPanel } from '@blueprintjs/core'

import defaultColumns from './CommentTable/columns'
import './DataToolbar.scss'

class DataToolbar extends Component {
  displayName: 'DataToolbar'
  propTypes: {
    resultEditor: PropTypes.object.isRequired,
    loading: PropTypes.boolean,
    toggleColumn: PropTypes.func,
    toggleReplies: PropTypes.func,
    toggleCollapsedReplies: PropTypes.func
  }
  defaultProps: {
    loading: true,
    toggleColumn: () => {},
    toggleReplies: () => {},
    toggleCollapsedReplies: () => {}
  }

  constructor (props) {
    super(props)
    this.renderCommentsTab = this.renderCommentsTab.bind(this)
    this.renderRepliesTab = this.renderRepliesTab.bind(this)
    this.renderColumnSwitch = this.renderColumnSwitch.bind(this)
    this.toggleColumn = this.toggleColumn.bind(this)
    this.toggleReplies = this.toggleReplies.bind(this)
    this.toggleCollapsedReplies = this.toggleCollapsedReplies.bind(this)
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
              this.renderColumnSwitch(c, (columns.get(c.key) && columns.get(c.key).get('active'))))
            }
          </div>
        </div>
      </TabPanel>
    )
  }

  renderRepliesTab () {
    const { loading, resultEditor } = this.props
    const { columns } = resultEditor.toObject()

    return (
      <TabPanel>
        <div className='data-toolbar-tab-panel'>
          <div className='row'>
            {this.renderSwitch({
              label: 'Include Replies',
              checked: resultEditor.get('replies'),
              onChange: this.toggleReplies
            })}

            {this.renderSwitch({
              disabled: !resultEditor.get('replies'),
              label: 'Collapse Replies',
              checked: resultEditor.get('collapsedReplies'),
              onChange: this.toggleCollapsedReplies
            })}
          </div>
          <hr />
          <div className='row'>
            {defaultColumns.filter(c => /^reply_/.test(c.key)).map(c => {
              const active = columns.get(c.key) && columns.get(c.key).get('active')
              const disabled = !resultEditor.get('replies') || resultEditor.get('collapsedReplies')
              return this.renderColumnSwitch(c, active, disabled)
            })}
          </div>
        </div>
      </TabPanel>
    )
  }

  renderColumnSwitch (c, active, disabled = false) {
    return this.renderSwitch({
      key: `column_${c.key}`,
      name: c.key,
      checked: active,
      label: c.name,
      disabled: disabled,
      onChange: this.toggleColumn
    })
  }

  renderSwitch ({ key, name, disabled, onChange, checked, label }) {
    return (
      <div key={key} className='col-sm-6 col-md-3 col-lg-3'>
        <Switch
          name={name}
          onChange={onChange}
          checked={checked}
          disabled={disabled}
          label={label} />
      </div>
    )
  }

  toggleColumn (e) {
    this.props.toggleColumn(e.target.name)
  }

  toggleReplies () {
    this.props.toggleReplies()
  }

  toggleCollapsedReplies () {
    this.props.toggleCollapsedReplies()
  }
}

export default DataToolbar
