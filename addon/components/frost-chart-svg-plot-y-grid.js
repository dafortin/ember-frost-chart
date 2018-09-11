import Ember from 'ember'
import layout from '../templates/components/frost-chart-svg-plot-y-grid'
import computed, {readOnly} from 'ember-computed-decorators'
import {isDomainValid} from 'ember-frost-chart/utils/validation'
import {PropTypes} from 'ember-prop-types'
import {Component} from 'frost-core-components'

const {get} = Ember

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,
  tagName: 'g',

  // == PropTypes =============================================================

  propTypes: {
    // options
    chartState: PropTypes.EmberObject.isRequired,
    ticks: PropTypes.func.isRequired,
    axesOnly: PropTypes.bool

    // state
  },

  getDefaultProps () {
    return {
      // options

      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('chartState.range.x', 'chartState.range.y', 'chartState.domain.y', 'axesOnly')
  _ticks (xRange, yRange, yDomain, axesOnly) {
    if (!xRange || !yRange || !isDomainValid(yDomain)) {
      return []
    }

    const yScale = this.get('chartState.scale.y')
    const yTransform = yScale({domain: yDomain, range: yRange})

    const ticks = this.get('ticks')(yDomain).map(tick => {
      return {
        x: xRange[1],
        y: yTransform(get(tick, 'value'))
      }
    })

    return axesOnly ? [ticks[0]] : ticks
  }

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================
})
