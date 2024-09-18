import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useProjects } from '@/contexts/ProjectsContext'
import { useNetwork } from '@/contexts/NetworkContext'
import { Button } from '@/components/ui/button'
import { useAccounts } from '@/contexts/AccountsContext'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const ProjectPage = () => {
  
  const { donationAddress } = useParams()
  const { getProjectByAddress } = useProjects()
  const [Project, setProject] = useState(getProjectByAddress(donationAddress))
  const [amount, setAmount] = useState<number>(0)
  const { api } = useNetwork()
  const { selectedAccount } = useAccounts()

  useEffect(() => {
    if (Project) return

    setProject(getProjectByAddress(donationAddress))
  }, [donationAddress, Project, getProjectByAddress])

  if (!Project || !api) return <div>No Project found</div>

  const onChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value))
  }

  if (!api || !selectedAccount) return <div>No account found</div>

  /// PAPI STUFF
  /// need to do BatchAll on


  const onSign = async () => {}

  //   ;(await tx)
  //     .signSubmitAndWatch(selectedAccount.polkadotSigner)
  //     .forEach((value) => console.log('value', value))
  // }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:mx-[5%] xl:mx-[20%] mx-0 sm:px-6 sm:py-0 md:gap-8">
      <h1 className="font-unbounded text-primary flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        Donate to "{Project.projectName}"
      </h1>
      <div className="grid py-4">
      <div className="items-center"> Team lead: {Project.teamLead}</div>
      <div className="items-center">DOT Address: {Project.donationAddress}</div>
      </div>
      <div className="items-center">Github: {Project.githubRepo}</div>
        <div className="items-center">{Project.description}</div>
      <div className="pageTop">
        <Label>Amount</Label>
        <Input onChange={onChangeAmount} value={amount} />
      </div>


      <Label className="flex">
        ⭐️GitHub Stars:<div className="ml-2">{0}</div>
      </Label>
      <Button onClick={onSign} disabled={amount === 0}>
        Donate
      </Button>
    </main>
  )
}
