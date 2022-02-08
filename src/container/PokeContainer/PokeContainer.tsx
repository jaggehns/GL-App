import React, { FC, useState, useEffect } from 'react'
import { Box, CircularProgress, Grid, LinearProgress } from '@material-ui/core'
import { PokemonList } from '../../config/api'
import axios from 'axios'
import { IPokemonList } from '../../interfaces/IPokemonList'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import { Pagination } from '@material-ui/lab'
import { makeStyles } from '@material-ui/styles'
import { IMAGE_API_URL } from '../../config/constants'
import { IFinalPokemonList } from '../../interfaces/IFinalPokemonList'

const useStyles = makeStyles(theme => ({
  pagination: {
    '& .MuiPaginationItem-root': {
      color: 'gold',
      '&:hover': {
        backgroundColor: '#772e2e',
      },

      '&:focus': {
        backgroundColor: '#772e2e',
      },
    },
  },
}))

const PokeContainer: FC = () => {
  const classes = useStyles()
  const [pokemonList, setPokemonList] = useState<IFinalPokemonList[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const getPokemonList = () => {
    setLoading(true)
    axios
      .get(PokemonList(), { timeout: 30000 })
      .then(response => {
        //API does not come with images
        //thus have to manually construct an array with
        //images from a different source + original data
        const { results } = response.data
        const newPokemonData: any = []
        results.forEach((pokemon: IPokemonList, index: number) => {
          index++
          const pokemonObject = {
            id: index,
            img: IMAGE_API_URL + index + '.png',
            name: pokemon.name,
          }
          newPokemonData.push(pokemonObject)
        })
        setPokemonList(newPokemonData)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)
        setLoading(false)
      })
  }

  useEffect(() => {
    getPokemonList()
  }, [])

  return (
    <Box>
      {loading ? (
        <LinearProgress style={{ marginTop: 50, backgroundColor: 'gold' }} />
      ) : pokemonList && !loading && !error ? (
        <Grid style={{ width: '100%', marginLeft: 0.5 }} container spacing={2}>
          {pokemonList.slice((page - 1) * 60, (page - 1) * 60 + 60).map((pokemon, index) => {
            return (
              <PokemonCard
                key={index}
                singlePokemon={pokemon.name}
                index={index}
                image={pokemon.img}
              />
            )
          })}
        </Grid>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}
        >
          <h1 style={{ color: 'white' }}>
            Sorry, we have run into an issue. This could be an api limitation
          </h1>
        </div>
      )}

      <Pagination
        variant='outlined'
        style={{
          padding: 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
        classes={{ ul: classes.pagination }}
        count={Math.floor(pokemonList?.length / 60)}
        onChange={(_, value) => {
          setPage(value)
        }}
      />
    </Box>
  )
}

export default PokeContainer
