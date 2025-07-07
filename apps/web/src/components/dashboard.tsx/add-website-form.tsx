import axios from "axios"
import { Activity, Plus } from "lucide-react"
import { type Dispatch, type SetStateAction, useState } from "react"
import { toast } from "sonner"
import type { WebsiteData } from "@/lib/types"
import { BACKEND_URL } from "@/lib/utils"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

type AddWebsiteFormProps = {
  setWebsites: Dispatch<SetStateAction<WebsiteData[]>>
}

export function AddWebsiteForm({ setWebsites }: AddWebsiteFormProps) {
  const [newWebsiteUrl, setNewWebsiteUrl] = useState("")
  const [isAddingWebsite, setIsAddingWebsite] = useState(false)

  const addWebsite = async (url: string) => {
    setIsAddingWebsite(true)

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/website`,
        { url },
        { withCredentials: true },
      )

      setWebsites(prev => [...prev, data])
      toast.success("Website status will be updated in 3 minutes")
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.message)
      } else {
        toast.error("Internal server error")
      }
    }

    setNewWebsiteUrl("")
    setIsAddingWebsite(false)
  }

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault()
    if (newWebsiteUrl.trim()) {
      addWebsite(newWebsiteUrl)
    }
  }
  return (
    <form onSubmit={handleAddWebsite} className="flex gap-4">
      <Input
        type="url"
        placeholder="https://example.com"
        value={newWebsiteUrl}
        onChange={e => setNewWebsiteUrl(e.target.value)}
        className="flex-1 bg-white/5 border-gray-600 text-white placeholder:text-gray-500 focus:border-brand-primary focus:ring-brand-primary/20"
        required
      />
      <Button
        type="submit"
        disabled={isAddingWebsite}
        className="bg-brand-primary hover:bg-brand-primary/90 text-white"
      >
        {isAddingWebsite ? (
          <Activity className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Plus className="w-4 h-4 mr-2" />
        )}
        {isAddingWebsite ? "Adding..." : "Add Website"}
      </Button>
    </form>
  )
}
