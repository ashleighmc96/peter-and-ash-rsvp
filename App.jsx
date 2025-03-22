import { useState } from 'react';
import { Card, CardContent } from './components/ui/card';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';

export default function EngagementRSVP() {
  const [step, setStep] = useState('passcode');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '',
    dietary: '',
    message: '',
  });
  const [passcode, setPasscode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const correctPasscode = 'pash2025';

  const handlePasscodeSubmit = () => {
    if (passcode === correctPasscode) {
      setStep('form');
    } else {
      alert('Incorrect passcode. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sheetURL = 'YOUR_SHEET_API_URL'; // Replace with your NoCodeAPI or SheetDB URL
    const response = await fetch(sheetURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }),
    });
    if (response.ok) {
      setSubmitted(true);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you for RSVPing!</h2>
        <p>We can’t wait to celebrate with you on December 6th at Mentone Life Saving Club.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <Card>
        <CardContent className="p-6">
          {step === 'passcode' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">You're Invited!</h1>
              <p>Please enter the passcode from your invite to RSVP.</p>
              <Input
                type="text"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <Button onClick={handlePasscodeSubmit}>Continue</Button>
            </div>
          )}

          {step === 'form' && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold">RSVP for Peter & Ash's Engagement</h2>
              <Input name="name" placeholder="Your full name" onChange={handleChange} required />
              <Input name="email" type="email" placeholder="Your email" onChange={handleChange} required />
              <Input name="guests" type="number" placeholder="Number of guests" onChange={handleChange} required />
              <Textarea name="dietary" placeholder="Dietary requirements (if any)" onChange={handleChange} />
              <Textarea name="message" placeholder="Leave a message (optional)" onChange={handleChange} />
              <Button type="submit">Submit RSVP</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
