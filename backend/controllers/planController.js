import User from '../models/user.js';
import Plan from '../models/plan.js';

async function subscribeUser(req, res) {
  const { userId, planId } = req.body;
  const plan = await Plan.findById(planId);

  if (!plan) {
    return res.status(404).json({ error: 'Plan not found' });
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + plan.duration);

  await User.findByIdAndUpdate(userId, {
    plan: planId,
    plan_start_date: startDate,
    plan_end_date: endDate
  });

  res.status(200).json({ message: `User ${userId} subscribed to plan ${plan.name}` });
}

async function getPlans(req, res) {
  try {
    const plans = await Plan.find();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Failed to fetch plans', error);
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
}

export { subscribeUser, getPlans };