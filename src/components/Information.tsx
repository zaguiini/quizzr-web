import React from 'react'
import { Box, Text } from '@chakra-ui/core'

const Loading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display="flex" flex={1} alignItems="center" justifyContent="Center">
      <Text>{children}</Text>
    </Box>
  )
}

export default Loading
