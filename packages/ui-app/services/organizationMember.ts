import { useEffect } from 'react'
import { httpDel, httpGet, httpPost } from './_req'
import { messageError } from '@shared/ui'
import { useParams } from 'next/navigation'
import { useOrgMemberStore } from '../store/orgMember'

export const orgMemberGet = (orgId: string) => {
  return httpGet(`/api/org/member/${orgId}`)
}

export const orgMemberSearch = ({
  projectId,
  orgId,
  term
}: {
  projectId: string
  orgId: string
  term: string
}) => {
  return httpPost(`/api/org/member/search`, {
    projectId,
    orgId,
    term
  })
}

export const orgMemberAdd = (datas: { orgId: string; email: string }) => {
  return httpPost('/api/org/member/invite', datas)
}

export const useOrgMemberGet = () => {
  const { orgID } = useParams()

  const { addAllOrgMember } = useOrgMemberStore()
  useEffect(() => {
    orgMemberGet(orgID)
      .then(res => {
        const { data, status } = res.data

        if (status !== 200) {
          messageError('Fetch organization member error ')
          return
        }

        addAllOrgMember(data)
      })
      .catch(err => {
        messageError(err)
      })
  }, [orgID, addAllOrgMember])
}

export const orgMemberRemove = ({ orgId, uid }: { orgId: string, uid: string }) => {
  return httpDel(`/api/org/member/remove/${orgId}/${uid}`)
}
