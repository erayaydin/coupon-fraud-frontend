import { Box, Button, FormControl, FormLabel, Stack, styled, TextField, Typography } from '@mui/material'
import MuiCard from '@mui/material/Card'
import { FormEvent, useState } from 'react'

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}))

const CheckoutContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 20,
  backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}))

export default function Checkout() {
  const [coupon, setCoupon] = useState('PROMO1000')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  const [couponError, setCouponError] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  const [couponErrorMessage, setCouponErrorMessage] = useState('')

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <Box sx={{ height: '100dvh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: '1 1', overflow: 'auto' }}>
        <CheckoutContainer>
          <Card variant='outlined'>
            <Typography component='h1' variant='h4' sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
              Checkout
            </Typography>
            <Box
              component='form'
              onSubmit={onFormSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor='coupon'>Coupon</FormLabel>
                <TextField
                  error={couponError}
                  helperText={couponErrorMessage}
                  id='coupon'
                  type='text'
                  name='coupon'
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder='XXX'
                  autoFocus
                  required
                  fullWidth
                  variant='outlined'
                  color={couponError ? 'error' : 'primary'}
                />
              </FormControl>
              <Button type='submit' fullWidth variant='contained' sx={{ marginTop: '10px' }}>
                Claim Coupon
              </Button>
            </Box>
          </Card>
        </CheckoutContainer>
      </Box>
    </Box>
  )
}
