const { Router } = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");
const router = Router();

// Stripe er valgfritt – aktiver automatisk hvis nøkkel finnes
const hasStripe = !!process.env.STRIPE_SECRET;
let stripe = null;
if (hasStripe) {
  stripe = require("stripe")(process.env.STRIPE_SECRET);
}

/** POST /api/payments/checkout  {amount,currency="nok"} */
router.post("/checkout", authMiddleware, async (req, res) => {
  try {
    const { amount, currency = "nok" } = req.body || {};
    if (!amount || Number(amount) <= 0) return res.status(400).json({ error: "Beløp mangler" });

    if (!hasStripe) {
      // Stripe ikke satt opp – returner 501 men med snill melding
      return res.status(501).json({ error: "Stripe ikke aktivert (legg STRIPE_SECRET i .env)" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: { name: "GA-13 Listing Fee" },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      success_url: process.env.SUCCESS_URL || "http://localhost:5173/success.html",
      cancel_url: process.env.CANCEL_URL || "http://localhost:5173/cancel.html",
    });

    res.json({ id: session.id, url: session.url });
  } catch (e) {
    console.error("Stripe error:", e);
    res.status(500).json({ error: "Stripe-feil" });
  }
});

module.exports = router;