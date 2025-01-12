import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateStepDto } from './dto/update-step.dto';
import { Step } from './entities/step.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const DEFAULT_STEPS = [
  {
    title: 'Second step',
    components: ['about_me']
  }, 
  {
    title: 'Third step',
    components: ['birthday']
  }
]

@Injectable()
export class StepsService implements OnModuleInit {
  constructor(
    @InjectRepository(Step)
    private stepsRepository: Repository<Step>,
  ) {}

  // Insert default record for the configuration
  async onModuleInit() {
    const steps = await this.stepsRepository.find()
    if (steps.length === 0) {
      await Promise.all(
        DEFAULT_STEPS.map(async (step) => await this.stepsRepository.insert(step))
      )
    }
  }

  findAll() {
    return this.stepsRepository.find()
  }

  update(id: number, updateStepDto: UpdateStepDto) {
    if (updateStepDto.components.length === 0) {
      throw new Error('components cannot be empty')
    }

    return this.stepsRepository.update({ id } , updateStepDto)


  }
}
