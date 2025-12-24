import { useState } from 'react';
import { Copy, RefreshCw, Check, X } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { generateAccount } from '@/lib/emailGenerator';

export default function EmailGenerator({ onSave }) {
  const [account, setAccount] = useState(generateAccount());
  const [copied, setCopied] = useState({ email: false, password: false });

  const handleGenerate = () => {
    setAccount(generateAccount());
    setCopied({ email: false, password: false });
  };

  const handleCopy = async (text, field) => {
    await navigator.clipboard.writeText(text);
    setCopied({ ...copied, [field]: true });
    setTimeout(() => setCopied({ ...copied, [field]: false }), 2000);
  };

  const handleSuccess = () => {
    onSave(account);
    handleGenerate();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Create New Account
          <Button onClick={handleGenerate} size="icon" variant="ghost" className="rounded-[12px]">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-[15px] font-medium">Email</label>
          <div className="flex gap-2">
            <Input value={account.email} readOnly className="flex-1" />
            <Button
              onClick={() => handleCopy(account.email, 'email')}
              size="icon"
              variant="outline"
              className="rounded-[12px]"
            >
              {copied.email ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[15px] font-medium">Password</label>
          <div className="flex gap-2">
            <Input value={account.password} readOnly className="flex-1 font-mono text-sm" />
            <Button
              onClick={() => handleCopy(account.password, 'password')}
              size="icon"
              variant="outline"
              className="rounded-[12px]"
            >
              {copied.password ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-2.5 pt-4">
          <Button onClick={handleSuccess} className="flex-1 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90" variant="default">
            <Check className="mr-2 h-4 w-4" />
            Success
          </Button>
          <Button onClick={handleGenerate} className="flex-1 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90" variant="default">
            <X className="mr-2 h-4 w-4" />
            Failed
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
