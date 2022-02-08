import React, { FC } from 'react'
import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

interface Props {
  singlePokemon: string
  index: number
  image: string
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const useStyles = makeStyles(theme => ({
  card: {
    cursor: 'pointer',
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgb(90,90,90)',
    },
  },
  cardMedia: {
    margin: 'auto',
    width: 130,
    height: 130,
  },
  cardContent: {
    textAlign: 'center',
  },
}))

const PokemonCard: FC<Props> = ({ singlePokemon, image }) => {
  const classes = useStyles()

  return (
    <>
      <Grid item xs={12} sm={2}>
        <Card className={classes.card}>
          <CardMedia className={classes.cardMedia} image={image}></CardMedia>
          <CardContent className={classes.cardContent}>
            <Typography style={{ fontSize: '20px' }}>{singlePokemon}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default PokemonCard
