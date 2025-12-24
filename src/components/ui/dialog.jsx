import * as React from "react"
import { X } from "lucide-react"
import { Button } from "./button"

const DialogContext = React.createContext({})

export function DialogProvider({ children }) {
  const [dialog, setDialog] = React.useState(null)

  const showDialog = React.useCallback(({ title, description, onConfirm, onCancel }) => {
    setDialog({ title, description, onConfirm, onCancel })
  }, [])

  const closeDialog = React.useCallback(() => {
    setDialog(null)
  }, [])

  const handleConfirm = () => {
    dialog?.onConfirm?.()
    closeDialog()
  }

  const handleCancel = () => {
    dialog?.onCancel?.()
    closeDialog()
  }

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      {dialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 animate-in fade-in"
            onClick={handleCancel}
          />
          
          {/* Dialog */}
          <div className="relative bg-card rounded-[24px] shadow-2xl w-full max-w-sm mx-4 p-6 animate-in zoom-in-95 fade-in">
            <button
              onClick={handleCancel}
              className="absolute right-4 top-4 rounded-[10px] p-1.5 hover:bg-secondary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{dialog.title}</h2>
              <p className="text-muted-foreground text-[15px]">{dialog.description}</p>
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleCancel}
                variant="secondary"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirm}
                className="flex-1"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within DialogProvider")
  }
  return context
}
