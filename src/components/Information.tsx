import React from 'react'
import { Box, Text } from '@chakra-ui/core'

interface InformationProps {
  children: React.ReactNode
  secondary?: React.ReactNode
}

const Information = ({ children, secondary = null }: InformationProps) => {
  return (
    <Box
      display="flex"
      padding={[8, 32]}
      flex={1}
      alignItems="center"
      flexDirection="column"
      justifyContent="Center"
    >
      <Text textAlign="center" fontSize="2xl">
        {children}
      </Text>
      {secondary && <Box mt={4}>{secondary}</Box>}
    </Box>
  )
}

export default Information
