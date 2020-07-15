import React, { Fragment } from 'react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

export const Loading = () => (
  <Fragment>
    <Segment>
      <Dimmer active inverted>
        <Loader size='large'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
    </Segment>
  </Fragment>
)
