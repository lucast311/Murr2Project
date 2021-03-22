import { shallowMount } from '@vue/test-utils'
import DriverPickUp from '@/components/DriverPickUp'
import { expect } from 'chai'

let wrapper

describe('DriverPickUp.vue', () => {
  // before each test
  beforeEach(() => {
    // create a new wrapper container for the shallow mount
    wrapper = shallowMount(DriverPickUp)
  })

  // we will need to check the post status code and add the "submit" button being clicked
  // as well we need to account for the other team on where data goes
  // we will need to remove the error messages for improper inputs and move it to be a single message somewhere

  /**
   * Title: TestCollectedFour
   * Purpose: Test a pickup history of only contaminated bins
   * Expected Result: Success
   * Return: return Collections History Form
   *         Message: "Submitted"
   **/
  it('Should successfully be valid with all bins collected', async () => {
    // const numBins = this.siteObject.numBins
    // numBins.setValue('4')
    // look for the collected input box
    // I have a feeling that the form isnt showing cause we added that function on DriverCollection
    // I also think we need to somehow bring the site object from drivercollection as it might need it for loading?
    const inputCollected = wrapper.find('#collected')
    // expect(inputCollected.exists()).to.equal(true)
    // set the input value for the collected box to the input '4'
    await inputCollected.setValue('4')
    // this will find the collected input box with the value and check if it equal to '4'
    expect(wrapper.find('#collected').element.value).to.equal('4')
    // this will find the correct input message and check if it is equal to 'Valid bin input'
    expect(wrapper.find('#properBins').text()).to.equal('Valid bin input')
  })

  /**
* Title: TestCollectedObstructedContaminated
 * Purpose: Test a pickup history of all bin types
 * Expected Result: Success
 * Return: return Collections History Form
 *          Message: "Submitted"
**/
  it('Should successfully be valid with all bins types', async () => {
    const inputCollected = wrapper.find('#collected')
    await inputCollected.setValue('2')
    expect(wrapper.find('#collected').element.value).to.equal('2')
    expect(wrapper.find('#properCollected').text()).to.equal('Valid bin input')
    const inputObstructed = wrapper.find('#obstructed')
    await inputObstructed.setValue('1')
    expect(wrapper.find('#obstructed').element.value).to.equal('1')
    expect(wrapper.find('#properObstructed').text()).to.equal('Valid bin input')
    const inputContaminated = wrapper.find('#contaminated')
    await inputContaminated.setValue('1')
    expect(wrapper.find('#contaminated').element.value).to.equal('1')
    expect(wrapper.find('#properContaminated').text()).to.equal('Valid bin input')
  })

  /**
 * Title: TestMissingBinError
 * Purpose: This test will test if the driver inputs a total of bins less than the
 *          number of bins associated to a site
 * Expected Result: Failure
 * Return: Error Message description: "Error - Invalid number of containers".
 **/
  it('Should display error when container number of containers is less than 4', async () => { // we will need to assign the error for all of this later
    // look for the collected input box
    const inputCollected = wrapper.find('#collected')
    // this will set the input to '1'
    await inputCollected.setValue('1')
    // this will find the collected input box with the value and check if it equal to '1'
    expect(wrapper.find('#collected').element.value).to.equal('1')
    // this will find the correct input message and check if it is equal to 'Valid bin input'
    expect(wrapper.find('#improperCollected').text()).to.equal('Valid bin input')
    // look for the obstructed input box
    const inputObstructed = wrapper.find('#obstructed')
    // this will set the input to '1'
    await inputObstructed.setValue('1')
    // this will find the obstructed input box with the value and check if it equal to '1'
    expect(wrapper.find('#obstructed').element.value).to.equal('1')
    // this will find the correct input message and check if it is equal to 'Valid bin input'
    expect(wrapper.find('#properObstructed').text()).to.equal('Valid bin input')
    // look for the contaminated input box
    const inputContaminated = wrapper.find('#contaminated')
    // this will set the input to '1'
    await inputContaminated.setValue('1')
    // this will find the contaminated input box with the value and check if it equal to '1'
    expect(wrapper.find('#contaminated').element.value).to.equal('1')
    // this will find the correct input message and check if it is equal to 'Invalid bin input'
    expect(wrapper.find('#improperContaminated').text()).to.equal('Error - Invalid number of bins')
  })
  /**
 * Title: TestMaxBinError
 * Purpose: This test will test if the driver inputs a total of bins
 *          more than the number of bins associated to a site
 * Expected Result: Failure
 * Return: Error Message description: "Error - Invalid number of containers".
 **/
  it('Should display error when container number of containers is more than 4', async () => { // we will need to assign the error for all of this later
    const inputCollected = wrapper.find('#collected')
    await inputCollected.setValue('2')
    expect(wrapper.find('#collected').element.value).to.equal('2')
    expect(wrapper.find('#properCollected').text()).to.equal('Valid bin input')
    const inputObstructed = wrapper.find('#obstructed')
    await inputObstructed.setValue('2')
    expect(wrapper.find('#obstructed').element.value).to.equal('2')
    expect(wrapper.find('#properObstructed').text()).to.equal('Valid bin input')
    const inputContaminated = wrapper.find('#contaminated')
    await inputContaminated.setValue('2')
    expect(wrapper.find('#contaminated').element.value).to.equal('2')
    expect(wrapper.find('#improperContaminated').text()).to.equal('Error - Invalid number of bins')
  })

  /**
 * Title: TestNullBinError
 * Purpose: This test will test if the driver inputs null bins
 * Expected Result: Failure
 * Return: Error Message description: "Error - Invalid, Bin number amount required".
 **/
  it('Should display error when container number of containers is null', async () => { // we will need to assign this later
    expect(wrapper.find('#improperCollected').text()).to.equal('Error - Invalid. Bin number amount required.')
    expect(wrapper.find('#improperObstructed').text()).to.equal('Error - Invalid. Bin number amount required.')
    expect(wrapper.find('#improperContaminated').text()).to.equal('Error - Invalid. Bin number amount required.')
  })

  /**
 * Title: TestNoSiteShown
 * Purpose: This test will test if there is no site
 * Expected Result: Failure
 * Return: Error Message description: "Error -No Site Exist".
 **/
  it('Should display error when report has no assigned site', async () => {
    expect(wrapper.find('#impropersite').text()).to.equal('Error - No site exists.') // we will need to assign this later
  })

  /**
 * Title: TestLoadPageError
 * Purpose: This test will test failure for page to load
 * Expected Result: Failure
 * Return: Error Message description: "Error - Invalid Page/ Not Found".
 **/
  it('Should display error when page is unable to load', async () => {
    expect(wrapper.find('#improperLoad').text()).to.equal('Error - Invalid Page/Not Found.') // we will need to assign this later
  })
})
