import React from 'react'

interface PlaceholderProps {
  ready: boolean
  fallback: React.ReactNode
  children: React.ReactNode
  delay?: number
}

interface PlaceholderState {
  showing: boolean
}

class Placeholder extends React.PureComponent<
  PlaceholderProps,
  PlaceholderState
> {
  suspendedPlaceholderTimeout: number | undefined

  state = {
    showing: false,
  }

  componentDidMount() {
    this.handlePlaceholder()
  }

  componentDidUpdate(prevProps: PlaceholderProps) {
    if (prevProps.ready !== this.props.ready) {
      this.handlePlaceholder()
    }
  }

  componentWillUnmount() {
    clearTimeout(this.suspendedPlaceholderTimeout)
  }

  handlePlaceholder() {
    if (this.props.ready || !this.props.delay) {
      this.setState({
        showing: true,
      })

      if (this.suspendedPlaceholderTimeout !== undefined) {
        clearTimeout(this.suspendedPlaceholderTimeout)
      }
    } else {
      this.suspendedPlaceholderTimeout = window.setTimeout(() => {
        this.setState({
          showing: true,
        })
      }, this.props.delay)
    }
  }

  render() {
    return this.state.showing
      ? this.props.ready
        ? this.props.children
        : this.props.fallback
      : null
  }
}

export default Placeholder
