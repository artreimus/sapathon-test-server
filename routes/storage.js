import express from 'express';

const router = express.Router();

router.route('/download').get();

export default router;
