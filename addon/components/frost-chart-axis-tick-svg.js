import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'
import {Component} from 'frost-core-components'

const {String: EmberString, isNone, run} = Ember

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  attributeBindings: ['transform'],
  tagName: 'g',

  // == PropTypes =============================================================

  propTypes: {
    // options
    axis: PropTypes.string.isRequired,
    coordinate: PropTypes.number

    // state
  },

  getDefaultProps () {
    return {
      // options
      coordinate: null

      // state
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('coordinate')
  transform (coordinate) {
    if (isNone(coordinate) || isNaN(coordinate)) {
      return EmberString.htmlSafe('')
    }

    const axis = this.get('axis')
    const x = axis === 'x' ? coordinate : 0
    const y = axis === 'y' ? coordinate : 0

    return `translate(${x}, ${y})`
  },

  // == Functions =============================================================

  _dispatchRenderedTick () {
    this.dispatch({
      type: 'RENDERED_TICK',
      axis: this.get('axis'),
      // FIXME: #8 Fixe height and width measurement calculation
      tick: {
        height: this.$().outerHeight(true),
        width: this.$().outerWidth(true)
      }
    })
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  didInsertElement () {
    this._super(...arguments)
    run.scheduleOnce('afterRender', this, this._dispatchRenderedTick)
  }

  // == Actions ===============================================================

})
