import React from 'react'
import { Box, Text } from '@chakra-ui/core'

interface LoadingProps {
  children: React.ReactNode
  secondary?: React.ReactNode
}

const Loading = ({ children, secondary = null }: LoadingProps) => {
  return (
    <Box
      display="flex"
      padding={[8, 32]}
      flex={1}
      alignItems="center"
      flexDirection="column"
      justifyContent="Center"
    >
      <Text fontSize="2xl">{children}</Text>
      {secondary && <Box mt={4}>{secondary}</Box>}
    </Box>
  )
}

export default Loading
