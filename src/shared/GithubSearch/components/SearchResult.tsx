import * as React from 'react'
import { connect } from 'react-redux'

interface Props {
  result: any[]
}

class SearchResult extends React.Component<Props> {
  public render() {
    return (
      <ul>
        {this.props.result.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    )
  }
}

export default connect((state: any) => ({
  result: state.githubSearch.result
}))(SearchResult)
