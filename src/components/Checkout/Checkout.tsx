import { Alert, Box, Button, FormControl, FormLabel, Stack, styled, TextField, Typography } from '@mui/material'
import MuiCard from '@mui/material/Card'
import { FormEvent, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

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
  const [couponClaimed, setCouponClaimed] = useState(false)
  const [couponError, setCouponError] = useState(false)
  const [couponErrorMessage, setCouponErrorMessage] = useState('')
  const [resetPending, setResetPending] = useState(false)

  const { getData: getVisitorData } = useVisitorData(
    {
      ignoreCache: true,
    },
    { immediate: false }
  )

  const { mutate: claimCoupon, isPending } = useMutation({
    mutationKey: ['request coupon claim'],
    mutationFn: async ({ coupon }: { coupon: string }) => {
      const { requestId } = await getVisitorData({ ignoreCache: true })

      return await fetch(import.meta.env.VITE_API_URL + '/api/coupon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coupon, requestId }),
      }).then((resp) => resp.json())
    },
    onSuccess: (data: { status: boolean; message: string }) => {
      if (!data.status) {
        setCouponError(true)
        setCouponErrorMessage(data.message)
        return
      }

      setCouponClaimed(true)
    },
    onError: (error) => {
      setCouponError(true)
      setCouponErrorMessage(error.message)
    },
  })

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    claimCoupon({ coupon })
  }

  const onReset = () => {
    setResetPending(true)

    fetch(import.meta.env.VITE_API_URL + '/api/use-case', {
      method: 'DELETE',
    }).then(() => {
      setResetPending(false)
      setCoupon('PROMO1000')
      setCouponClaimed(false)
      setCouponError(false)
      setCouponErrorMessage('')
    })
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
                  id='coupon'
                  type='text'
                  name='coupon'
                  value={coupon}
                  disabled={couponClaimed}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder='XXX'
                  autoFocus
                  required
                  fullWidth
                  variant='outlined'
                  color={couponError ? 'error' : 'primary'}
                />
              </FormControl>
              <Button disabled={couponClaimed} type='submit' fullWidth variant='contained' sx={{ marginTop: '10px' }}>
                {isPending ? 'Loading...' : 'Claim Coupon'}
              </Button>
              <Button type='button' fullWidth onClick={onReset} variant='outlined' sx={{ marginTop: '10px' }}>
                Reset Use-Case
              </Button>
              {couponClaimed && <Alert severity='success'>Coupon claimed!</Alert>}
              {couponError && <Alert severity='error'>{couponErrorMessage}</Alert>}
            </Box>
          </Card>
        </CheckoutContainer>
      </Box>
    </Box>
  )
}
