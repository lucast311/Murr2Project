import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import Progress from '@/components/ResidentPoints.vue'

//  story32 below
describe('ResidentPoints.vue', () => {
  it('renders props.value when passed residentid 3', () => {
    const residentid = 3
    const points = 0
    const wrapper = mount(Progress, {
      propsData: { residentid: residentid }
    })
    wrapper.setProps({ residentid: residentid })
    expect(wrapper.element).to.include(points) // should return 0
  })
  it('renders props.value when passed residentid 1', () => {
    const residentid = 1
    const points = 1000
    const wrapper = mount(Progress, {
      beforeMount: { tempPoints: points }
    })
    wrapper.setData({ residentid: residentid, tempPoints: points })
    expect(wrapper.text()).to.include(points) // should return 1000
  })
  it('renders props.value when passed residentid 4', () => {
    const residentid = 4
    const points = NaN
    const wrapper = mount(Progress, {
      data: { residentid: residentid, tempPoints: points }
    })
    wrapper.setData({ tempPoints: points })
    expect(wrapper.text()).to.include(points) // should return null
  })
})
