import { Button } from '@/components/ui/button'

function Mybutton({data, url}:{data : string, url : string}) {
  return (
    <div>
        <Button className='ml-36 mt-10' ><a href={url.toString()}>{data}</a></Button>
    </div>
  )
}

export default Mybutton