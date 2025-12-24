import { useState } from 'react';
import { Copy, Trash2, Edit2, Check, Search } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';

// Highlight text matching search keyword
const HighlightText = ({ text, search }) => {
  if (!search.trim()) return <>{text}</>;
  
  const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return (
    <>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <span key={i} className="bg-yellow-300 dark:bg-yellow-500 text-black px-0.5 rounded">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export default function EmailList({ accounts, onUpdate, onDelete, isLoading }) {
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState('');

  const filteredAccounts = accounts.filter(acc =>
    acc.email.toLowerCase().includes(search.toLowerCase()) ||
    acc.note.toLowerCase().includes(search.toLowerCase()) ||
    (acc.firstName && acc.firstName.toLowerCase().includes(search.toLowerCase())) ||
    (acc.lastName && acc.lastName.toLowerCase().includes(search.toLowerCase()))
  );

  const handleCopy = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  const toggleStatus = (account) => {
    onUpdate({
      ...account,
      status: account.status === 'used' ? 'unused' : 'used'
    });
  };

  const startEdit = (account) => {
    setEditingId(account.id);
    setEditNote(account.note);
  };

  const saveEdit = (account) => {
    onUpdate({ ...account, note: editNote });
    setEditingId(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-20">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-muted-foreground text-sm">Loading accounts...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account List ({accounts.length})</CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {filteredAccounts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-2">
                {accounts.length === 0 ? 'No accounts yet' : 'No results found'}
              </p>
              {accounts.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  Create your first account above
                </p>
              )}
            </div>
          ) : (
            filteredAccounts.map((account) => (
              <div key={account.id} className="border rounded-[18px] p-5 space-y-3 bg-card">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    {/* Hiển thị First Name và Last Name */}
                    {(account.firstName || account.lastName) && (
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-muted-foreground">
                          <HighlightText text={`${account.firstName || ''} ${account.lastName || ''}`.trim()} search={search} />
                        </p>
                        <Button
                          onClick={() => handleCopy(`${account.firstName || ''} ${account.lastName || ''}`.trim())}
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 flex-shrink-0 rounded-[8px]"
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <p className="font-medium text-[15px] truncate">
                        <HighlightText text={account.email} search={search} />
                      </p>
                      <Button
                        onClick={() => handleCopy(account.email)}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 flex-shrink-0 rounded-[10px]"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-xs text-muted-foreground truncate">
                        {account.password}
                      </p>
                      <Button
                        onClick={() => handleCopy(account.password)}
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 flex-shrink-0 rounded-[10px]"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button onClick={() => startEdit(account)} size="icon" variant="ghost" className="h-8 w-8 rounded-[10px]">
                      <Edit2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button onClick={() => onDelete(account.id)} size="icon" variant="ghost" className="h-8 w-8 rounded-[10px] text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                    <Badge
                      variant={account.status === 'used' ? 'success' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => toggleStatus(account)}
                    >
                      {account.status === 'used' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>

                {editingId === account.id ? (
                  <div className="flex gap-2">
                    <Input
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      placeholder="Add note..."
                      className="flex-1"
                    />
                    <Button onClick={() => saveEdit(account)} size="icon" variant="ghost" className="rounded-[10px]">
                      <Check className="h-4 w-4" />
                    </Button>
                  </div>
                ) : account.note ? (
                  <p className="text-[13px] text-muted-foreground truncate">
                    <HighlightText text={account.note} search={search} />
                  </p>
                ) : null}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
