import React, { useEffect } from 'react';

function StripeOnboard({ user }) {

    useEffect(() => {
        window.location.replace(user.stripeAccountLinkUrl)
    }, [])

    return(
        <div>
            <p>Redirecting to Stripe...</p>
        </div>
    )
}

export default StripeOnboard;