import React from 'react'
import Interweave from 'interweave'
import { Box, Icon, Text } from '@chakra-ui/core'

interface ListItemProps {
  mt: number
  question: string
  isAnswerCorrect: boolean
  shouldTruncate?: boolean
}

const ListItem = ({
  mt,
  question,
  isAnswerCorrect,
  shouldTruncate,
}: ListItemProps) => {
  const textProps = shouldTruncate
    ? {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap' as 'nowrap',
        overflow: 'hidden',
      }
    : {}

  return (
    <Box
      fontSize={[16, 22]}
      mt={mt}
      as="li"
      display="flex"
      alignItems="center"
      color={`${isAnswerCorrect ? 'green' : 'red'}.600`}
    >
      <Icon name={isAnswerCorrect ? 'check' : 'close'} mr={4} />
      <Text as="span" {...textProps}>
        <Interweave content={question} />
      </Text>
    </Box>
  )
}

export default ListItem
