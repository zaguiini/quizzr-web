import React from 'react'
import { Text, Box } from '@chakra-ui/core'

const Hero = () => {
  return (
    <Box>
      <Text as="h1" fontSize={['4xl', '6xl']}>
        Welcome to{' '}
        <Text fontWeight={700} as="span" color="purple.500">
          Quizzr
        </Text>
      </Text>
      <Text color="gray.500" fontSize={['2xl', '4xl']}>
        It&apos;s time to test your knowledge!
        <br />
        <strong>Can you score 100%?</strong>
      </Text>
    </Box>
  )
}

export default React.memo(Hero, () => true)
